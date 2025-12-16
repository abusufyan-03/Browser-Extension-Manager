import data from "./data.json" with {type: "json"};
const extensionList = document.querySelector('.extension-list');
const tabBtns = document.querySelectorAll('.tab-btn');
const allTabBtn = document.getElementById('all');
const activeTabBtn = document.getElementById('active');
const inactiveTabBtn = document.getElementById('inactive');
const themSwitch = document.querySelector('.theme-switch');

function renderExtensions(data) {
  let html = '';
  data.forEach((element, index) => {
    html += `
    <div class="extension-card">
            <div class="extension-data">
              <img src="${element.logo}" alt="">
              <div class="extension-info">
                <h1>${element.name}</h1>
                <p class="extension-description">
                  ${element.description}
                </p>
              </div>
            </div>

            <div class="extension-control">
              <button data-index="${index}">Remove</button>
              <div class="toggleUi">
                <input type="checkbox" id="${index}" ${element.isActive ? "checked" : ""}>
                <label for="${index}" class="toggleSwitch"></label>
              </div>
            </div>
          </div>
    `;
  });
  extensionList.innerHTML = html;
}
renderExtensions(data);


extensionList.addEventListener('click', function (e) {
  if (e.target.tagName === 'INPUT') {
    let index = Number(e.target.id);
    // changing toggle state in array memory
    data[index].isActive = e.target.checked;
  }
  // delete Extension card
  if (e.target.tagName === 'BUTTON') {
    let removedExtensionId = Number(e.target.dataset.index);
    console.log(removedExtensionId)
    data.splice(removedExtensionId, 1);
    renderExtensions(data);
  }
})


// Tab Logic

allTabBtn.addEventListener('click', function () {
  extensionList.innerHTML = '';
  renderExtensions(data);
});

activeTabBtn.addEventListener('click', function () {
  extensionList.innerHTML = '';
  const activeExtensions = data.filter((d) => d.isActive === true);
  renderExtensions(activeExtensions);
});

inactiveTabBtn.addEventListener('click', function () {
  extensionList.innerHTML = '';
  const inactiveExtensions = data.filter((d) => d.isActive === false);
  renderExtensions(inactiveExtensions);
})

tabBtns[0].classList.add('active')
tabBtns.forEach((tab) => {
  tab.addEventListener('click', function () {
    tabBtns.forEach((t) => t.classList.remove('active'))
    tab.classList.add('active')
  })
})


/* Dark mode */
let darkmode = localStorage.getItem('dark');

const enableDarkmode = () => {
  document.body.classList.add('darkmode');
  themSwitch.setAttribute('aria-pressed', 'true')
  localStorage.setItem('dark', 'active');
}
const disableDarkmode = () => {
  document.body.classList.remove('darkmode');
  themSwitch.setAttribute('aria-pressed', 'false')
  localStorage.setItem('dark', null)
}

if (darkmode === 'active') enableDarkmode();

themSwitch.addEventListener('click', function () {
  darkmode = localStorage.getItem('dark')
  darkmode !== 'active' ? enableDarkmode() : disableDarkmode()
})