let tooltips = [];
let tooltipOwners = {};

let elementsWithId = [];

export default class Site {
    static init() {
        console.log(`Initializing site components...`);

        // Define initializers for initializable site components here!

        document.addEventListener(`DOMContentLoaded`, function() {
            // Initialize tooltips
            var tooltipped = document.querySelectorAll(`.tooltipped`);
            var instances = M.Tooltip.init(tooltipped, {});
            tooltips = instances.slice();

            for (let t of tooltips) {
                tooltipOwners[t] = t.el;
            }
        });

        for (let el of document.getElementsByTagName(`*`)) {
            if (el.id !== undefined && el.id != "") {
                elementsWithId.push(el);
            }
        }
    }

    static getTooltipsOn(ownerElementID) {
        return tooltips.filter(t => t.el.id == ownerElementID);
    }

    static update() {
        this.init({auto: true});
    }

    static fromId(id) {
        return elementsWithId.filter(el => el.id == id);
    }
}
