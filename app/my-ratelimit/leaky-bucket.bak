import {Redis} from "@upstash/redis";

class LeakyBucket {
    redis: Redis;
    capacity: number;
    leakRate: number;

    constructor(redis: Redis, capacity: number, leakRate: number) {
        this.redis = redis;
        this.capacity = capacity;
        this.leakRate = leakRate;
    }

    async increment(key: string) {
        const currentTime = Date.now() / 1000;
        const transaction = this.redis.multi();

        // Update the bucket's last updated timestamp and its level
        transaction.hgetall(key);
        transaction.exec((err, replies) => {
            let level = 0;
            let lastUpdated = currentTime;
            if (replies[0]) {
                level = parseFloat(replies[0].level);
                lastUpdated = parseFloat(replies[0].lastUpdated);
            }

            // How much has leaked out since this was last updated?
            const delta = this.leakRate * (currentTime - lastUpdated);
            level = Math.max(0, level - delta);

            // If the resulting level is less than the capacity, increment the level
            if (level < this.capacity) {
                transaction.hmset(key, {
                    level: level + 1,
                    lastUpdated: currentTime
                });
                transaction.exec();
                return true;
            } else {
                // Bucket is full
                return false;
            }
        });
    }
}

// Usage
// const redis = new Redis({
//     url: '<UPSTASH_REDIS_REST_URL>',
//     token: '<UPSTASH_REDIS_REST_TOKEN>'
// });
// const bucket = new LeakyBucket(redis, 10, 1);
// const key = 'some-key';
// const isAllowed = await bucket.increment(key);
// console.log(isAllowed);
