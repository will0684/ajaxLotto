document.addEventListener('DOMContentLoaded', init)

// when html and javascript finish loading, run this function, which adds event listeners to buttons
function init(){
  document.getElementById('btnSend').addEventListener('click', nav)
  document.getElementById('btnBack').addEventListener('click', nav)
}
// navigation function that control page actions on button click
function nav(event){
  // set btn variable to be the targeted element sent to the function
  let btn = event.target;
  // use id of clicked button to activate one of two actions
  switch (btn.id) {
    // if btnSend is clicked, make result list of numbers visible and hide form/home page
    case 'btnSend':
      document.getElementById('home').classList.remove('active');
      document.getElementById('list').classList.add('active');
      // retrieve numbers entered in form
      getNumbers();
      break;
    case 'btnBack':
    document.getElementById('home').classList.add('active');
    document.getElementById('list').classList.remove('active');
      break;
  }
}

function makeURL(){
  let url = 'http://localhost/will0684/ajaxLotto/nums.php?';
  // get digits and max from the form
  let digits = document.getElementById('digits');
  let max = document.getElementById('max');
  // place value of digit and max into url
  url = `${url}digits=${digits.value}&max=${max.value}`;
  return url;
}

// function to get numbers from php and insert into html
function getNumbers(){
  let url = makeURL();
  fetch(url)
  // return data from url, put into response variable and then return in json format
  .then(response => response.json())
  // json data goes into data variable where it is verified for errors by the code method
  .then(data => {
    if(data.code == 0){
    // code 0 means no errors on the server
      let ul = document.querySelector('ul.num_list');
      ul.innerHTML = '';
      data.numbers.forEach(num => {
        let li = document.createElement('li');
        li.textContent = num;
        ul.appendChild(li);
      });
    }
  })
}