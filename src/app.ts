import {Client} from "tplink-smarthome-api";
import {AnyDevice} from "tplink-smarthome-api/lib/client";
import fs from "fs";

async function main() {
    const client = new Client();
    if (!fs.existsSync("log.txt")) {
        fs.writeFileSync("log.txt", 'time;value\r\n');
    }
    client.getDevice({ host: '192.168.0.198' }).then((device: AnyDevice) => {
        setInterval(() => {
            device.getInfo().then((data) => {
                const workaroundForStupids = JSON.parse(JSON.stringify(data));
                const powerValue = workaroundForStupids["emeter"]["realtime"]["power"];
                console.log(`Writing ${powerValue} to file log.txt`);
                fs.appendFileSync("log.txt", `${new Date().toISOString()};${powerValue}\r\n`);
            }).catch(error => console.log(error));
        }, 1000);
    });
}

//Invoke the main function
main().catch(err => {
    console.log(err);
});