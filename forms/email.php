<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $company = $_POST['company'];
    $message = $_POST['message'];
    $from = 'From: Digital Amoeba Contact Form';
    $to = 'jdbriggs81@gmail.com';
    $cc = 'aaron.sales.hunter@gmail.com';
    $human = $_POST['human'];
    $body = "From: $name\n E-Mail: $email\n Message:\n $message";

    if ($_POST['submit'] && $human == '4') {
        if ($_POST['submit']) {
    if ($name != '' && $email != '' && $message != '') {
        if ($human == '4') {
            if (mail ($to, $subject, $body, $from)) {
	        echo '<p>Your message has been sent!</p>';
	    } else {
	        echo '<p>Something went wrong, go back and try again!</p>';
	    }
	} else if ($_POST['submit'] && $human != '4') {
	    echo '<p>You answered the anti-spam question incorrectly!</p>';
	}
    } else {
        echo '<p>You need to fill in all required fields!!</p>';
    }
}}
?>
