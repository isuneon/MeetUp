<?php

namespace App\Http\Controllers\User;

use App\Http\AuthenticateUser;
use App\Http\AuthenticateUserListener;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;

class UserController extends ApiController implements AuthenticateUserListener
{
    public function login(AuthenticateUser $authenticateUser, Request $request)
    {
        $hasCode = $request->has('code');

        if ($hasCode) {
            //return $authenticateUser->execute($hasCode, $this);
            return redirect(env('URI_FRONTEND') . "login/" . $authenticateUser->execute($hasCode, $this)->id_meetup);
        } else {
            return $authenticateUser->execute($hasCode, $this);
        }

    }

    public function userHasLoggedIn($user)
    {
        return redirect('/');
    }
}
