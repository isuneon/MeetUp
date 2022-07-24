<?php

namespace App\Exceptions;

use App\Traits\ApiResponser;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Handler extends ExceptionHandler
{
    use ApiResponser;
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        //INICIO MENSAJE DE ERROR VALIDACIONES
        if ($exception instanceof ValidationException) {
            return $this->convertValidationExceptionToResponse($exception, $request);
        }
        //FIN MENSAJE DE ERROR VALIDACIONES

        //INICIO MENSAJE DE ERROR NO EXISTE REGISTRO CON EL IDENTIFICADOR
        if ($exception instanceof ModelNotFoundException) {
            $modelName = strtolower(class_basename($exception->getModel()));

            return $this->errorResponse("No existe {$modelName} con el identificador especificado", 404);
        }
        //FIN MENSAJE DE ERROR NO EXISTE REGISTRO CON EL IDENTIFICADOR

        //INICIO MENSAJE DE ERROR AUTENTICACION
        if ($exception instanceof AuthenticationException) {
            return $this->unauthenticated($request, $exception);
        }
        //FIN MENSAJE DE ERROR AUTENTICACION

        //INICIO MENSAJE DE ERROR AUTERIZACION
        if ($exception instanceof AuthorizationException) {
            return $this->errorResponse($exception->getMessage(), 403);
        }
        //FIN MENSAJE DE ERROR AUTERIZACION

        //INICIO MENSAJE DE ERROR RUTA NO EXISTE
        if ($exception instanceof NotFoundHttpException) {
            return $this->errorResponse('La URL especificada no puede ser encontrada', 404);
        }
        //FIN MENSAJE DE ERROR RUTA NO EXISTE

        //INICIO MENSAJE DE ERROR  NO EXISTE METODO(GET,POST....)
        if ($exception instanceof MethodNotAllowedHttpException) {
            return $this->errorResponse('El método especificado para la solicitud no es válido', 405);
        }
        //FIN MENSAJE DE ERROR  NO EXISTE METODO(GET,POST....)

        //INICIO MENSAJE OTROS ERRORES HTTP
        if ($exception instanceof HttpException) {
            return $this->errorResponse($exception->getMessage(), $exception->getStatusCode());
        }
        //FIN MENSAJE OTROS ERRORES HTTP

        //INICIO MENSAJE OTROS ERRORES Query
        if ($exception instanceof QueryException) {
            $errorCode = $exception->errorInfo[1];

            if ($errorCode == 1451) {
                return $this->errorResponse('No se puede eliminar este recurso permanentemente. Está relacionado con cualquier otro recurso', 409);
            }
        }
        //FIN MENSAJE OTROS ERRORES Query

        if ($exception instanceof TokenMismatchException) {
            return redirect()->back()->withInput($request->input());
        }

        if (config('app.debug')) {
            return parent::render($request, $exception);
        }

        return $this->errorResponse('Unexpected Exception. Try later', 500);
    }

    // MENSAJES DE ERROR AUTENTICACION
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($this->isFrontend($request)) {
            return redirect()->guest('login');
        }

        return $this->errorResponse('Unauthenticated.', 401);
    }
    // FIN MENSAJES DE ERROR AUTENTICACION

    // MENSAJES PERSONALIZADOS DE ERROR
    protected function convertValidationExceptionToResponse(ValidationException $e, $request)
    {
        $errors = $e->validator->errors()->getMessages();

        if ($this->isFrontend($request)) {
            return $request->ajax() ? response()->json($error, 422) : redirect()
                ->back()
                ->withInput($request->input())
                ->withErrors($errors);
        }

        return $this->errorResponse($errors, 422);
    }
    // FIN MENSAJES PERSONALIZADOS DE ERROR

    private function isFrontend($request)
    {
        return $request->acceptsHtml() && collect($request->route()->middleware())->contains('web');
    }
}
