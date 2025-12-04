import data from "./data.json" with {type: "json"};
const extensionList = document.querySelector('.extension-list');
let html = '';
data.forEach((element, index) => {
    html += `
    <div class="extension-card">
            <div class="extension-data">
              <img src="${element.logo}">
              <div class="extension-info">
                <h3>${element.name}</h3>
                <p class="extension-description">
                  ${element.description}
                </p>
              </div>
            </div>

            <div class="extension-control">
              <button>Remove</button>
              <div class="toggleUi">
                <input type="checkbox" id="${index}" ${element.isActive? "checked": ""}>
                <label for="${index}" class="toggleSwitch"></label>
              </div>
            </div>
          </div>
    `;
    extensionList.innerHTML = html;
})