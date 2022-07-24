<?php
namespace App\Http;

use App\Repositories\UserRepository;
use Illuminate\Contracts\Auth\Guard as Authenticator;
//use Laravel\Socialite\Contracts\Factory as Socialite;
use Socialite;

class AuthenticateUser
{
    /**
     * @var UserRepository
     */
    private $users;
    /**
     * @var Socialite
     */
    private $socialite;
    /**
     * @var Authenticator
     */
    private $auth;
    /**
     * @param UserRepository $users
     * @param Socialite $socialite
     * @param Authenticator $auth
     */
    public function __construct(UserRepository $users, Socialite $socialite, Authenticator $auth)
    {
        $this->users     = $users;
        $this->socialite = $socialite;
        $this->auth      = $auth;
    }
    /**
     * @param boolean $hasCode
     * @param AuthenticateUserListener $listener
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function execute($hasCode, AuthenticateUserListener $listener)
    {
        if (!$hasCode) {
            var_dump("if");
            return $this->getAuthorizationFirst();
        }
        var_dump("not if");
        $user = $this->users->findByUsernameOrCreate($this->getGithubUser());

        return $user;
        //$this->auth->login($user, true);
        //return $listener->userHasLoggedIn($user);
        //var_dump($user->id_meetup);
        //die();
        //$url = env('URI_FRONTEND') . $user->id_meetup;
        // redirects to http://google.com
        //return redirect($url);
    }
    /**
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    private function getAuthorizationFirst()
    {
        //return $this->socialite->driver('meetup')->redirect();
        return Socialite::driver('meetup')->redirect();
    }
    /**
     * @return \Laravel\Socialite\Contracts\User
     */
    private function getGithubUser()
    {
        //return $this->socialite->driver('meetup')->user();
        return Socialite::driver('meetup')->user();
    }
}
