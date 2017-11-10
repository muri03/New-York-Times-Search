$(document).ready(function (){

    $("#search").on("click", function(){
    
        var searchParameter = $("#search-term").val();
        var queryURL= "https://api.nytimes.com/svc/search/v2/articlesearch.json?api_key=600cc6fe0445408a87dda5085c17d121&q=" + searchParameter;
        
        $.ajax({
            url: queryURL,
            method: "GET"
            }).done(function(data) {
                //console.log(data);
                //console.log(data.response.docs.length);
                
                /*  =========================================
                    Fetching HTML element to display articles
                    ========================================= */
                var articlePanel = $("#articles");
                
                /*  ====================================================================
                    In response to Ajax call, we get Array of Objects.
                    We have to loop through that array to access each object's property.
                    This for loop goes through every object in the array,
                    fetches the necessary information and display that on HTML.
                    I am just accessing 2 as of now. 1. snippet and, 2. web_url
                    ==================================================================== */
                for(var i=0; i<data.response.docs.length; i++){
                    
                    /* Creating HTML elemnts on the fly */
                    var well = $("<div class='well'>");
                    var h3 = $("<h3>");
                    var a = $("<a>");

                    /* Assigning attributes/values to it */
                    h3.text(data.response.docs[i].snippet);
                    a.text(data.response.docs[i].web_url);
                    a.attr("href", data.response.docs[i].web_url);
                    a.attr("target", "_blank");

                    /* Append it to appropriate Parent Element */
                    well.append(h3);
                    well.append(a);

                    articlePanel.append(well);
                }

            });
    });

    /*  ===========================================================
        When we click on "Clear Search", clear the article section.
        ===========================================================   */
    $("#clear").on("click",function(){
        $("#articles").html('');
    });

});