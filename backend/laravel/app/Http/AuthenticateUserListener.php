<?php
namespace App\Http;

interface AuthenticateUserListener
{
    /**
     * @param $user
     * @return mixed
     */
    public function userHasLoggedIn($user);
}
