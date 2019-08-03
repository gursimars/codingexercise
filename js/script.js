class Shape
{
	constructor(name, height, length, width, mass)
	{
		this.name = name;
		this.height = height;
		this.length = length;
		this.width = width;
		this.mass = mass;
		this.weight = this.mass * 9.8;
		this.volume = this.height * this.length * this.width;
		this.density = this.mass / this.volume;

		if(height > width * 2 && height > length * 2)
		{
			this.shape = "Tall";
		}
		if(width > length * 2 || width > height * 2 || length > width * 2 || length > height * 2)
		{
			this.shape = "Long";
		}
		if(height < width / 2 && height < length / 2)
		{
			this.shape = "Flat";
		}
		if(width < height / 2 && width < length / 2 || length < width / 2 && length < height / 2)
		{
			this.shape = "Thin";	
		}
	}
}

var shape = [];

$.getJSON('http://101.0.97.194:5443/shapes/example.json', function(data) {
	$.each(data, function (index, value) {
        shape.push(new Shape(value.name, value.height, value.length, value.width, value.mass));
    });

    $.each(shape, function(index, item) {
    	$('#shapeTable').append('<tr><td>' + item.name + '</td><td>' + item.shape + '</td><td class="item">' + item.density.toFixed(2) + '</td><td><a onclick="selectItem(' + index + ')" href="#details" class="btn btn-success"><i class="glyphicon glyphicon-eye-open"></i></a></td></tr>');
   	});

   	$('#shapeTable').DataTable();
});

function selectItem(index)
{
	$('#tableGrid').attr("class","col-md-8");
	$('#view_Name').html(shape[index].name + ' <span class="label label-default">' + shape[index].shape + '</span>');

	var dimensions = "<label>Length: " + shape[index].length + "m<br /> Width: " + shape[index].width + "m<br /> Height: " + shape[index].height + "m </label>"

	$('#view_Details').html("Dimensions <br />" + dimensions + "<br />Weight: " + shape[index].weight.toFixed(2) + "<br />Density: " + shape[index].density.toFixed(2) + " <br />Mass: " + shape[index].height + "<br /> Volume: " + shape[index].volume.toFixed(2));
	$('#details').focus();	
}

