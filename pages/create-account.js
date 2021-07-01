import InputLabel from "../components/InputLabel";
import { useForm } from "react-hook-form";
import InputError from "../components/InputError";
import {useRef} from "react";
import {gql, useMutation} from "@apollo/client";
import { useRouter } from "next/router";
import { CREATE_ACCOUNT } from "../constantsGQL";

export default function CreateAccount() {
    const router = useRouter();
    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    const password = useRef({});
    password.current = watch('password', '');
    const [createAccount] = useMutation(CREATE_ACCOUNT);

    const createAccountFormSubmit = (data, e) => {
        createAccount({
            variables: {
                name: data.name,
                email: data.email,
                password: data.password
            }
        })
            .then(() => router.push('/login'))
            .catch(err => console.log(err))
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
                            <InputLabel text="Nombre" />
                            <div className="control">
                                <input
                                    type="text"
                                    name="name"
                                    { ...register('name', { required: true }) }
                                />
                            </div>
                            { errors.name && <InputError text="El nombre es requerido" /> }
                        </div>
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
