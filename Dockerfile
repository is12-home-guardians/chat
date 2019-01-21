FROM golang
RUN go get github.com/gorilla/websocket
RUN go get github.com/koron/go-spafs
ADD . /go/src/github.com/is12-home-guardians/chat
EXPOSE 80 8080
WORKDIR /go/src/github.com/is12-home-guardians/chat
CMD go run ./back-end/*.go
