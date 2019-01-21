// Copyright 2013 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"flag"
	"log"
	"net/http"
	spafs "github.com/koron/go-spafs"
)

var spaAddr = flag.String("spaAddr", ":80", "SPA address")
var websocketAddr = flag.String("websocketAddr", ":8080", "websocket address")

func main() {
	flag.Parse()

	// SPA
    staticContentFs := spafs.FileServer(http.Dir("./../front-end/dist"))
    err := http.ListenAndServe(*spaAddr, staticContentFs)
    if err != nil {
        panic(err)
	}

	// websocket
	handler := http.NewServeMux()
	hub := newHub()
	go hub.run()

	handler.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(hub, w, r)
	})

	err = http.ListenAndServe(*websocketAddr, handler)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
