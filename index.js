import data from "./data.json" with {type: "json"};
const extensionList = document.querySelector('.extension-list');
const tabBtns = document.querySelectorAll('.tab-btn');
const allTabBtn = document.getElementById('all');
const activeTabBtn = document.getElementById('active');
const inactiveTabBtn = document.getElementById('inactive');

function renderExtensions(data) {
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
              <button id="${index}">Remove</button>
              <div class="toggleUi">
                <input type="checkbox" id="${index}" ${element.isActive? "checked": ""}>
                <label for="${index}" class="toggleSwitch"></label>
              </div>
            </div>
          </div>
    `;
        extensionList.innerHTML = html;
    });
}
renderExtensions(data);

// data change

extensionList.addEventListener('click', function(e){
    if(e.target.tagName === 'INPUT'){
        let index = Number(e.target.id);
        data[index].isActive = e.target.checked;
    }
    if(e.target.tagName === 'BUTTON'){
        let removedExtensionId = Number(e.target.id);
        console.log(removedExtensionId)
        alert("clicked removed")
        data.splice(removedExtensionId, 1);
        renderExtensions(data);
    }
})


// Tab Logic

allTabBtn.addEventListener('click', function(){
    extensionList.innerHTML = '';
    renderExtensions(data);
});

activeTabBtn.addEventListener('click', function(){
    extensionList.innerHTML = '';
    const activeExtensions = data.filter((d) => d.isActive === true);
    renderExtensions(activeExtensions);
});

inactiveTabBtn.addEventListener('click', function(){
    extensionList.innerHTML = '';
    const inactiveExtensions = data.filter((d)=> d.isActive === false);
    renderExtensions(inactiveExtensions);
})

tabBtns[0].classList.add('active')
tabBtns.forEach((tab)=> {
    tab.addEventListener('click', function(){
        tabBtns.forEach((t)=> t.classList.remove('active'))
        tab.classList.add('active')
    })
})
