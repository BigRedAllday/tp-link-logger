import {Client} from "tplink-smarthome-api";
import {AnyDevice} from "tplink-smarthome-api/lib/client";

async function main() {
    const client = new Client();
    client.getDevice({ host: '192.168.0.15' }).then((device: AnyDevice) => {
        // device.getSysInfo().then(console.log);
        device.setPowerState(true);
        device.getInfo().then(console.log);
        console.log(device.supportsEmeter);
    });
}


//Invoke the main function
main().catch(err => {
    console.log(err);
});