<?php 
	$dir = scandir('unrealperson');
	if (count($dir) === 2) die; 
	$db = new SQLite3('gamescribe.db');
	$stmt = $db->prepare("select * from 
	(select gender, age, count(*) as unreal_person_count from unreal_person group by age, gender) as up natural join 
	(select gender, age, count(*) as person_count from persons group by age, gender) as p");
	$result = $stmt->execute();
?>
<!DOCTYPE html>
<html>
<head>
	<title>Formulář</title>
</head>
<body>
	<div  style="text-align: center; font-size: 24px">
<img src="unrealperson/<?php echo $dir[2]; ?>" alt="Obrázek osoby" width="800px">
	<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
		<input type="text" name="info" /> <br />
	</form>
	<table align="center">
<?php
	while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
		echo "<tr><td>". ($row['gender'] === "m" ? "Muži" : "Ženy") . "</td><td>{$row['age']}</td><td>{$row['unreal_person_count']}</td><td>{$row['person_count']}</td><td>" . ($row['person_count'] - $row['unreal_person_count']) . "</td>";
	}	
?>
		<tr><td colspan="2">Zbývá</td><td><?=(count($dir) - 2); ?></td></tr>
	</table>

</div>
<script>
	document.querySelector("[type=text]").focus();
</script>
</body>
</html>

<?php


if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$info = $_POST['info'];
	if ($info === "0") {
		unlink('unrealperson/'.$dir[2]);
	} else if (strlen($info) === 2) {		
		$stmt = $db->prepare('INSERT INTO unreal_person (gender, age) VALUES (:gender, :age)');
		$stmt->bindValue(':gender', $info[0] == "4" ? "m" : "f", SQLITE3_TEXT);
		$stmt->bindValue(':age', $info[1] == "4" ? "young" : "middle", SQLITE3_TEXT);
		$stmt->execute();
		$id = $db->lastInsertRowID();
		$db->close();
		rename('unrealperson/'.$dir[2], 'photos/'.$id.'.jpg');
	}
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}
?>
