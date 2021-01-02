//Listen to the form submit event
document.getElementById('loan-form').addEventListener('submit', function(e){

  //hide results
  document.getElementById('results').style.display = 'none';

  //show spinner
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculate, 2000);

  e.preventDefault()
});

function calculate(){
  //create UI varriables
  const amount = document.getElementById('amount');
  const interestRate = document.getElementById('interest-rate');
  const period = document.getElementById('period');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  //get values from the input
  const principal = parseFloat(amount.value);
  const calculatedRate = parseFloat(interestRate.value)/100/12;
  const calculatedPeriod = parseFloat(period.value) * 12;

  // Computations
  const x = Math.pow( 1 + calculatedRate, calculatedPeriod);
  const monthly = ( principal * x * calculatedRate) / (x - 1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPeriod).toFixed(2);
    totalInterest.value = ((monthly * calculatedPeriod) - principal).toFixed(2);

    //show results
  document.getElementById('results').style.display = 'block';

  //show spinner
  document.getElementById('loading').style.display = 'none';

  }else {
    
    showErrors('Please check your values');
    
  }
}
// show errors
function showErrors(error) {
  //hide results
  document.getElementById('results').style.display = 'none';

  //show spinner
  document.getElementById('loading').style.display = 'none';
  //create a div
  const errorDiv = document.createElement('div');

  //add a class to the div
  errorDiv.className = 'alert alert-danger';

  //create a textnode and append it to the div
  errorDiv.appendChild(document.createTextNode(error));

  //define varriables
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading')

  card.insertBefore(errorDiv, heading)

  //clear error
  setTimeout(clearError, 3000);
}

function clearError(){
  document.querySelector('.alert').remove();
}