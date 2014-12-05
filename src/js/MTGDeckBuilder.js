function MTGDeckBuilder(cardData) {
    var cardNames = Object.keys(cardData);
    this.cardNames = cardNames;
    this.bind();
}

MTGDeckBuilder.prototype = {
    bind:function(){
        var input = $("#cardSearch");
        var thisApp = this;
        var cardNames = this.cardNames;
        input.focus();
        input.keyup(function(event){
            var value = $(this).val().toLowerCase();
            if(value.length<3) {
                $('#results').empty();
                return false;
            }
            var results = [];
            for(var i=0; i<cardNames.length; i++) {
                var cardName = cardNames[i];
                if(cardName.toLowerCase().indexOf(value) !=-1) {
                    results.push(cardName);
                }
            }
            $('#results').empty();
            for(var i=0; i<results.length; i++) {
                var cardName = results[i];
                $('#results').append($('<li>', {
                    'text': cardName,
                    'class': "list-group-item"
                }));
            }
            if(event.keyCode == 13 &&results.length>0) {
                thisApp.renderCard(results[0]);
            }
        });
        $('#results').on("mouseenter", "li", function(){
           $("#results li.active").removeClass("active");
           $(this).addClass("active");
        });
        $('#results').on("click", "li", function(){
            var text = $(this).text();
            thisApp.renderCard(text);
        });
    },
    renderCard:function(cardName){
        var imgUrl = "http://mtgimage.com/card/"+cardName+".jpg";
        $("#cardImage img").prop("src", imgUrl).prop("alt", cardName);
    }
};
