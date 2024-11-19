package main

import (
	"context"
	"fmt"

	"github.com/blocto/solana-go-sdk/client"
	"github.com/blocto/solana-go-sdk/rpc"
	"github.com/blocto/solana-go-sdk/types"
)

func main() {
	// create a RPC client
	c := client.NewClient(rpc.MainnetRPCEndpoint)

	// get the current running Solana version
	response, err := c.GetVersion(context.TODO())
	if err != nil {
		panic(err)
	}

	fmt.Println("version", response.SolanaCore)

	balance, err := c.GetBalance(context.TODO(), "9qeP9DmjXAmKQc4wy133XZrQ3Fo4ejsYteA7X4YFJ3an")
	// balance, err := c.GetBalance(context.TODO(), "28WJTTqMuurAfz6yqeTrFMXeFd91uzi9i1AW6F5KyHQDS9siXb8TquAuatvLuCEYdggyeiNKLAUr3w7Czmmf2Rav")
	if err != nil {
		panic(err)
	}

	fmt.Println(balance)

	account, _ := types.AccountFromBase58("28WJTTqMuurAfz6yqeTrFMXeFd91uzi9i1AW6F5KyHQDS9siXb8TquAuatvLuCEYdggyeiNKLAUr3w7Czmmf2Rav")
	fmt.Println(account.PublicKey.String())
}
