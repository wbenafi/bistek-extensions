
const input = document.getElementById("port_input")
const noPort = document.getElementById("no_port")
const portDescriptionContainer = document.getElementById("port_description_container")

chrome.storage.local.get("ports", ({ ports }) => {

    input.addEventListener('keyup', () => {
        if (input.value != "" && !isNaN(input.value)) {

            const port = ports.find(port => port.port_number == Number(input.value))

            if (port) {
                showPortInfo(
                    `Port ${input.value} ${port.service_name ? "-" : ""} ${port.service_name.toUpperCase()}`,
                    port.transport_protocol,
                    port.description
                )
                return
            }
        }
        hidePortInfo()
    })
})

function showPortInfo(title, protocol, description) {
    noPort.style.display = "none"
    portDescriptionContainer.style.display = "block"

    document.getElementById("title").textContent = title
    document.getElementById("protocol").textContent = protocol
    document.getElementById("description").textContent = description
}

function hidePortInfo() {
    portDescriptionContainer.style.display = "none"
    noPort.style.display = "block"
}

