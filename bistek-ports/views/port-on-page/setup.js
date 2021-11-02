
class PortDescriptionDialog {

    elements = { container: null, title: null, protocol: null, description: null }

    constructor() {
        this.elements = this.createElements()

        this.close = this.close.bind(this)
    }

    get opened() {
        return this.elements.container.style.display !== "none"
    }

    open(values) {

        this.elements.title.textContent = values.title
        this.elements.protocol.textContent = values.protocol
        this.elements.description.textContent = values.description
        this.elements.container.style.display = "block"

        setTimeout((() => { this.elements.container.style.opacity = "1" }).bind(this))
    }


    close() {
        if(this.opened){
            this.elements.container.style.opacity = "0"
            
            setTimeout((() => { this.elements.container.style.display = "none"}).bind(this), 500)
        }
    }

    createElements() {
        const container = document.createElement("div")
        container.className = "port-description-container"
        container.addEventListener('click', (e) => e.stopPropagation())
        container.style.display = "none"

        const title = document.createElement("h1")
        container.appendChild(title)

        const protocol = document.createElement("p")
        protocol.className = "protocol"
        container.appendChild(protocol)

        const description = document.createElement("p")
        description.className = "description"
        container.appendChild(description)

        document.body.appendChild(container)

        return { container, title, protocol, description }
    }
}

function mainSetup() {
    chrome.storage.local.get("ports", ({ ports }) => {
        const portDescriptionDialog = new PortDescriptionDialog()

        document.addEventListener('dblclick', (e) => {
            console.log(e)
            console.log(document.getSelection())

            const selection = document.getSelection().toString().trim()
            if (selection != "" && !isNaN(selection)) {

                const port = ports.find(port => port.port_number == Number(selection))

                if (port) {
                    portDescriptionDialog.open(
                        {
                            title: `Port ${selection} ${port.service_name? "-": ""} ${port.service_name.toUpperCase()}`,
                            protocol: port.transport_protocol,
                            description: port.description
                        }
                    )
                }
            }
        });

        document.addEventListener('scroll', portDescriptionDialog.close)
        document.addEventListener('click', portDescriptionDialog.close)

    })

}

mainSetup()