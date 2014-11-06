<?php
ini_set('display_errors', 1);
require_once('TwitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "302558268-cXaZqRshijfkBBP3b7RxbUI7EhMPYMhDD5RWbWkB",
    'oauth_access_token_secret' => "frZiJszuW1YyAUB2GmweFJDwzs5JON3IBIjKngGJjH7w7",
    'consumer_key' => "TEmPpIHkUl0sGdUdYCKPtotPZ",
    'consumer_secret' => "3HH4R8Gx4YYmbLn21QDvpY3ccFSRQjzDE7P51E9DCjNFogCAmL"
);

/** URL for REST request, see: https://dev.twitter.com/docs/api/1.1/ **/
$url = 'https://api.twitter.com/1.1/direct_messages/new.json';
$requestMethod = 'POST';

/** POST fields required by the URL above. See relevant docs as above **/
$postfields = array(
    'screen_name' => 'anmol_gup23',
    'text' => 'Hi man!'
);

/** Perform a POST request and echo the response **/
$twitter = new TwitterAPIExchange($settings);
echo $twitter->buildOauth($url, $requestMethod)
             ->setPostfields($postfields)
             ->performRequest();
?>