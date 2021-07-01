import InputLabel from "../components/InputLabel";
import { useForm } from "react-hook-form";
import InputError from "../components/InputError";
import {useRef} from "react";

export default function CreateAccount() {
    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    const password = useRef({});
    password.current = watch('password', '');

    const createAccountFormSubmit = (data, e) => {

    }

    return(
        <div className="container">
            <div className="columns">
                <div className="column is-half is-offset-one-quarter">
                    <form
                        className="box"
                        onSubmit={handleSubmit(createAccountFormSubmit)}
                    >
                        <h4>Crear una cuenta</h4>
                        <div className="field">
                            <InputLabel text="Correo"/>
                            <div className="control">
                                <input
                                    type="email"
                                    name="email"
                                    { ...register('email', { required: true }) }
                                />
                            </div>
                            { errors.email && <InputError text="Correo requerido" /> }
                        </div>
                        <div className="field">
                            <InputLabel text="Contraseña" />
                            <div className="control">
                                <input
                                    type="password"
                                    name="password"
                                    { ...register('password', { required: true }) }
                                />
                            </div>
                            { errors.password && <InputError text="Contraseña requerida" /> }
                        </div>
                        <div className="field">
                            <InputLabel text="Confirmar contraseña" />
                            <div className="control">
                                <input
                                    type="password"
                                    name="confirmPass"
                                    { ...register('confirmPass', {
                                        required: 'Confirmar contraseña es requerida',
                                        validate: value => value === password.current || 'Las contraseñas no coinciden'
                                    }) }
                                />
                            </div>
                            { errors.confirmPass && <InputError text={errors.confirmPass.message} /> }
                        </div>
                        <button type="submit" className="button is-info">Registrarme</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
