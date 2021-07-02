import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {CREATE_PRODUCT} from "../../constantsGQL";
import {useRouter} from "next/router";
import InputLabel from "../../components/InputLabel";
import InputError from "../../components/InputError";
import Navbar from "../../components/Navbar";

function Create() {
    const router = useRouter();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [createProduct] = useMutation(CREATE_PRODUCT);
    const createFormSubmit = (data, e) => {
        createProduct({
            variables: {
                name: data.name,
                sku: data.sku,
                quantity: Number(data.quantity),
                price: Number(data.price)
            }
        })
            .then(() => router.push('/product'))
            .catch(err => console.log(err))
    }

    return (
        <div className="container">
            <div className="columns">
                <div className="column is-2">
                    <Navbar />
                </div>
                <div className="column">
                    <form
                        className="box"
                        onSubmit={handleSubmit(createFormSubmit)}
                    >
                        <div className="columns">
                            <div className="column">
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
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <div className="field">
                                    <InputLabel text="SKU" />
                                    <div className="control">
                                        <input
                                            type="text"
                                            name="sku"
                                            { ...register('sku', { required: true }) }
                                        />
                                    </div>
                                    { errors.sku && <InputError text="El SKU es requerido" /> }
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <div className="field">
                                    <InputLabel text="Cantidad" />
                                    <div className="control">
                                        <input
                                            type="number"
                                            name="quantity"
                                            { ...register('quantity', { required: true }) }
                                        />
                                    </div>
                                    { errors.quantity && <InputError text="La cantidad es requerida" /> }
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <div className="field">
                                    <InputLabel text="Precio" />
                                    <div className="control">
                                        <input
                                            type="number"
                                            name="price"
                                            { ...register('price', { required: true }) }
                                        />
                                    </div>
                                    { errors.price && <InputError text="El precio es requerido" /> }
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="button">Crear</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create
