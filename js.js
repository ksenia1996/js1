var request = require('request'); 
var urlold = 'http://www.mosigra.ru';
var mailre = /\b[\w\d_.+-]+@[\w\d-]+.[\w\d-.]+/g;
var urlre = /<a href=\"(\/[-+\w:\/#@$.]*)/g;
var r=[];
var email=[];
var sumEl = 0;
var numb = 2;
find(urlold,0)
function get(All) {
  var result = [];
  if (All != undefined) 
    result = All.filter(function(item, pos) {
		return All.indexOf(item) == pos;
	}) 
  return result;
}
function find(url,i)
{
    i=i+1;        
    request(url, function (err,res,body)
    {
	if (err) throw err;
        var pageEmails=body.match(mailre);           
	if(pageEmails) 
	{			
            pageEmails=get(pageEmails);
	    if(pageEmails) 
		for (j = 0; j < pageEmails.length; j++) 
			if (email.indexOf(pageEmails[j]) == -1) 
				email.push(pageEmails[j]);
        }			
        ref=body.match(urlre);
        if (typeof(ref) != null) {
            ref=get(ref);
            for(j=0; j<ref.length; j++)    
                if (r.indexOf(ref[j]) == -1 && i<numb) {
                    newRef=ref[j].split('href="')[1];
                    find(urlold + newRef,i);
                    r.push(ref[j]);
                }
              
        }
    });
	if (sumEl < email.length) 
       	{
		if (numb == 2)
		console.log(email+"\n\n");	
		sumEl = email.length;
        }
}
