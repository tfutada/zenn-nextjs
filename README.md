
This repository contains the codes for Zenn blogs as follows.


### Server Action

https://zenn.dev/tfutada/articles/10e9ef769144f9

myaction* - Server Action

### rate limit using KV store, Upstash

run Vegata command to conduct performance test.

middleware.ts - the middleware where rate limit is implemented
app/my-ratelimit - rate limits from scratch, sliding window, leaky bucket
app/mysession - session management using KV store and Cookie

```sh
echo 'GET http://localhost:3000/api-void' | vegeta attack -rate=2 -duration=60s | tee results.bin | vegeta report
```

### next-auth

app/api/auth
app/api-auth - Router Handler
login*