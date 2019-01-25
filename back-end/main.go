// Copyright 2013 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	spafs "github.com/koron/go-spafs"
)

var addr = flag.String("addr", ":80", "SPA address")

func main() {
	flag.Parse()

	// SPA
	staticContentFs := spafs.FileServer(http.Dir("./front-end/dist"))

	fmt.Println("Dist listening starting...")

	// websocket
	handler := http.NewServeMux()
	hub := newHub()
	go hub.run()

	handler.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(hub, w, r)
	})

	handler.HandleFunc("/", staticContentFs.ServeHTTP)

	err := http.ListenAndServe(*addr, handler)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
