import { useForm } from "react-hook-form";
import {useMutation} from "@apollo/client";
import { useRouter } from "next/router";
import { LOGIN } from "../constantsGQL";
import InputLabel from "../components/InputLabel";
import InputError from "../components/InputError";
import {AUTH_TOKEN, ROLE} from "../constants";
import Link from 'next/link'
import styles from '../styles/Login.module.scss';

export default function Login() {
    const router = useRouter();
    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    const [login] = useMutation(LOGIN);


    const loginFormSubmit = (data, err) => {
        login({
            variables: {
                email: data.email,
                password: data.password
            }
        })
            .then((response) => {
                if (typeof window !== 'undefined') {
                    sessionStorage.setItem(AUTH_TOKEN, response.data.login.token);
                    sessionStorage.setItem(ROLE, response.data.login.role);
                }
                router.push('/');
            })
            .catch(err => console.log(err))
    }



    return (
        <div className={'container'}>
            <div className="columns">
                <div className="column is-half is-offset-one-quarter">
                    <form
                        className="box"
                        onSubmit={handleSubmit(loginFormSubmit)}
                    >
                        <h4>Iniciar sesión</h4>
                        <div className="columns">
                            <div className="column">
                                <div className="field">
                                    <InputLabel text="Correo"/>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="email"
                                            name="email"
                                            { ...register('email', { required: true }) }
                                        />
                                    </div>
                                    { errors.email && <InputError text="Correo requerido" /> }
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <div className="field">
                                    <InputLabel text="Contraseña" />
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="password"
                                            name="password"
                                            { ...register('password', { required: true }) }
                                        />
                                    </div>
                                    { errors.password && <InputError text="Contraseña requerida" /> }
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <Link href="/create-account">
                                    <a>Registrate</a>
                                </Link>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <button type="submit" className="button is-info">Entrar</button>
                            </div>
                            <div className="column">
                                <Link href="/">
                                    <a className="button">Regresar</a>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
