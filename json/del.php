<?php
if(isset($_POST['delete'])){
	$label = $_POST['label'].'.json';
	$file = file_get_contents($label);
	$data = json_decode($file);
	//$unset_queue = array();
	unset($file);//prevent memory leaks for large json.
	/*foreach ( $data as $i => $item )
	{
	    if($item->name == $_POST['name'] && $item->amount == $_POST['amount'] && $item->type == $_POST['type'] && $item->date == $_POST['date']){
	    	echo "F.";
	    }else{
	    	echo "NF.";
	    }
	}*/
	unset($data[$_POST['index']]);
	$data = array_values($data);
	//echo json_encode($data);
	if(file_put_contents($label,json_encode($data))){
		echo "success";
	}else{
		echo "no";
	}
	unset($data);
}else{
	echo "no";
}
?>