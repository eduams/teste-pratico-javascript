const fs = require('fs');

fs.readFile('./broken-database.json', 'utf-8', (err, jsonString) =>{
if (err) {
  console.log(err);
}
else{
  try{  
    var obj = 0
    const data = JSON.parse(jsonString);
    while(obj <= 9){
    //substitui o æ por a, ¢ por c, ø por o e ß por b
    data[obj].name = data[obj].name.replace(new RegExp("æ", "g"),"a");
    data[obj].name = data[obj].name.replace(new RegExp("¢", "g"),"c");
    data[obj].name = data[obj].name.replace(new RegExp("ø", "g"),"o");
    data[obj].name = data[obj].name.replace(new RegExp("ß", "g"),"b");
    //arruma os strings de price para number
    data[obj].price = parseInt(data[obj].price)
    //adiciona quantity se ausente
    if (data[obj].quantity){
    }
    else{
      data[obj].quantity = 0;
    }
    //console.log(data[obj]);
    obj = obj + 1;
  }
  fs.writeFileSync('./saida.json', JSON.stringify(data, null, 2));
}
  catch(err){
    console.log('Erro', err)
  }
}
})

fs.readFile('./saida.json', 'utf-8', (err, jsonString) => {
if (err){
  console.log(err);
}
else {
  try{
    var obj = 0
    const data = JSON.parse(jsonString);
//ordenar category e id e depois imprimir os nomes dos produtos
console.log('Produtos ordenados por categoria e id:\n');
data.sort(function (a, b) {
  return a.category.localeCompare(b.category) || a.id - b.id;
})
    while(obj <= 9){
    console.log(data[obj].name)
    obj = obj + 1;
    }
console.log();
//calcular o valor total do estoque por categoria
console.log('Valores referentes ao estoque para cada categoria:\n')
var newObjectsMerged = data.reduce((object, item) => {
  var category = item.category;
  var amount = item.price * item.quantity;
  if (!object.hasOwnProperty(category)) {
    object[category] = 0;
  }
  object[category] += amount;
  return object;
},{})

console.log(newObjectsMerged);

  }
  catch{
    console.log('Erro', err)
  }
}
}
)

