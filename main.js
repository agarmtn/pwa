if('serviceWorker' in navigator){
    console.log('Puedes usar los serviceWorker del navegador');

    navigator.serviceWorker.register('./sw.js')
    .then(res => console.log('serviceWorker cargado correctamente', res))
    .catch(err => console.log('serviceWorker no se ha podido registrar', err))
}else{
    console.log('NO puedes usar los serviceWorker del navegador');
}

//scroll suavizado
$(document).ready(function(){
    //console.log("Hola mundo");
    $("menu a").click(function(e){
        //Cancela el evento si este es cancelable
        e.preventDefault();
        //animate es un metodo de instamcia crea una nueva animacion
        $("html, body").animate({
            //establece el numero de pixeles que el contenido de un elemento
            //ha sido desplazado
            scrollTop: $($(this).attr('href')).offset().top
        });
        return false;
    })
});
