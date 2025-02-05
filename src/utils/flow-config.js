import * as fcl from "@onflow/fcl"

fcl.config({
    "flow.network" : "local",
    "accessNode.api" : "http://localhost:8888",
    "discovery.wallet": "http://localhost:8701/fcl/authn"
})
