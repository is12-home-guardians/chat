# chat

## How to start

### Setup
```bash
# move directory
$ cd front-end
# install frontend dependencies
$ yarn
# build frontend source code
$ yarn build
# back to workspace root
$ cd ..
# Build and run
$ docker-compose up -d --build
```

### Debug
Acccess to localhost:80 with your browser

- port 80: http-content
- port 8080: websocket

### Develop
- Case: only front-end

```bash
$ cd front-end
$ yarn start
```

- Case: with backend
```
$ yarn build
$ docker-compose restart -d
```
