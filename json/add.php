<?php
if(isset($_POST['submit'])){
	$label = $_POST['label'].'.json';
	$file = file_get_contents($label);
	$data = json_decode($file);
	unset($file);//prevent memory leaks for large json.
	unset($_POST['label'],$_POST['submit']);
	$_POST['amount'] = intval($_POST['amount']);
	$data[] = $_POST;
	//print_r($data);
	if(file_put_contents($label,json_encode($data))){
		echo "success";
	}else{
		echo "no";
	}
	unset($data);
}else{
	//echo "else in";
	echo "no";
}
?>