FROM golang
RUN go get github.com/gorilla/websocket
ADD . /go/src/github.com/is12-home-guardians/chat
EXPOSE 8080
WORKDIR /go/src/github.com/is12-home-guardians/chat
CMD go run *.go
