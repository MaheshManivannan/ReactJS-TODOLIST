function digits(number)
{
let sum=0,mah;
while(number!=0)
{
  mah=number % 10;
  sum += mah;
  number= Math.floor(number/10);
  
}
if(sum >= 10){
  digits(sum);
}
else{
  document.write(sum);
}

}
digits(12345);