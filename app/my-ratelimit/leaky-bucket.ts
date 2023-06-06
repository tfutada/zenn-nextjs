import {kv} from '@vercel/kv';

interface Bucket {
    level: number;
    lastUpdated: number;
}

class LeakyBucket {
    capacity: number;
    leakRate: number;

    constructor(capacity: number, leakRate: number) {
        this.capacity = capacity;
        this.leakRate = leakRate;
    }

    async increment(key: string) {
        const currentTime = Date.now() / 1000;

        // Update the bucket's last updated timestamp and its level
        let bucket = await kv.get<Bucket>(key);
        let level = 0;
        let lastUpdated = currentTime;
        if (bucket) {
            level = bucket.level;
            lastUpdated = bucket.lastUpdated;
        }

        // How much has leaked out since this was last updated?
        const delta = this.leakRate * (currentTime - lastUpdated);
        level = Math.max(0, level - delta);

        // If the resulting level is less than the capacity, increment the level
        let resp = {
            success: level < this.capacity,
            remaining: this.capacity - level,
            reset: 0
        };

        if (resp.success) {
            await kv.set(key, {
                level: level + 1,
                lastUpdated: currentTime
            });
        }

        return resp;
    }
}

export default LeakyBucket;
