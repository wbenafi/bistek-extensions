function submit(event) {
    event.preventDefault()
    main(ipInput.value, subnetInput.value)
    show()
}

form.addEventListener('submit', submit)


let ipMask = null

let ipNet = null

let ipBr = null
let ipBro = null

let ipEn = null

let subBits = 0;
let hostBits = 0;

let hostsQuantity = 0
let subnetsQuantity = 0

let firstUsable = null
let lastUsable = null


function getPrefixMask(prefixSize) {
    var mask = 0,
        i;

    for (i = 0; i < prefixSize; i++) {
        mask += (1 << (32 - (i + 1))) >>> 0;
    }

    var d = mask % 256;

    for (var i = 3; i > 0; i--) {
        mask = Math.floor(mask / 256);
        d = mask % 256 + '.' + d;
    }

    return d + '';
}

function calculateMask(prefixLength) {
    const prefixMask = getPrefixMask(prefixLength)

    ipMask = prefixMask

    ipBr = ipMask.split('.').map(v => 255 - Number(v)).join('.')

    subBits = prefixLength

    hostBits = 32 - prefixLength
}

function calculateNetworkAddress() {

    let result = []

    const ipEnList = ipEn.split('.')
    const maskList = ipMask.split('.')

    for (let i = 0; i < 4; i++) {
        result[i] = Number(ipEnList[i]) & Number(maskList[i])
    }

    ipNet = result.join('.');
}

function calculateBroadcast() {

    let result = []

    const ipNetList = ipNet.split('.')
    const ipBrList = ipBr.split('.')

    for (let i = 0; i < 4; i++) {
        result[i] = Number(ipNetList[i]) | Number(ipBrList[i])
    }

    ipBro = result.join('.');
}

function calculateHostSub() {
    subnetsQuantity = Math.pow(2, subBits)
    hostsQuantity = Math.pow(2, hostBits) - 2
}

function calculateIpRange() {

    let netAux = ipNet.split('.')

    let last = Number(netAux.pop() + 1)

    firstUsable = netAux.join('.') + '.' + last


    let brAux = ipBro.split('.')

    last = Number(brAux.pop() - 1)

    lastUsable = netAux.join('.') + '.' + last
}


function main(ipEntry, prefixLength) {
    ipEn = ipEntry
    calculateMask(prefixLength)
    calculateNetworkAddress()
    calculateBroadcast()
    calculateHostSub()
    calculateIpRange()
}

function show() {
    results.className = "results-container"
    document.getElementById("ipDisplay").innerHTML = ipEn;
    document.getElementById("subnetDisplay").innerHTML = ipMask;
    document.getElementById("networkDisplay").innerHTML = ipNet;
    document.getElementById("broadDisplay").innerHTML = ipBro;
    document.getElementById("subnetnumDisplay").innerHTML = subnetsQuantity;
    document.getElementById("hostDisplay").innerHTML = hostsQuantity;
    document.getElementById("firstIpDisplay").innerHTML = firstUsable;
    document.getElementById("lastIpDisplay").innerHTML = lastUsable;

    moreDetails.href = `https://www.calculator.net/ip-subnet-calculator.html?cclass=any&csubnet=${subnetInput.value}&cip=${ipInput.value}&ctype=ipv4&printit=0&x=60&y=13`
}