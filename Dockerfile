FROM golang
RUN go get github.com/gorilla/websocket
ADD . /go/src/github.com/rin1208/go-contests
EXPOSE 8080
WORKDIR /go/src/github.com/rin1208/go-contests
CMD go run *.go
