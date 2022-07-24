<?php
namespace App\Repositories;

use App\User;

class UserRepository
{
    /**
     * @param $userData
     * @return static
     */
    public function findByUsernameOrCreate($userData)
    {
        //return $userData;
        //var_dump($userData);

        //die();
        $data = User::where('id_meetup', $userData->id)
            ->orderBy('created_at', 'desc')
            ->first();
        if ($data) {
            $data->remember_token = $userData->token;
            $data->save();
            return $data;
        } else {
            return User::firstOrCreate([
                'username'       => $userData->nickname,
                'email'          => $userData->email,
                'avatar'         => $userData->avatar,
                'id_meetup'      => $userData->id,
                'remember_token' => $userData->token,
            ]);
        }

    }
}
