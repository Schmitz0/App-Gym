import React, { useState } from 'react';
import {
	useGetAllProductsQuery,
	usePostProductMutation,
	useDeleteProductMutation,
} from '../../redux/query/ApiEcommerce';
import style from './FormProducts.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { uploadImage } from '../FormRoutines/uploadImage.js';
import Loading from '../Loading/Loading';
import FormControl from '@mui/material/FormControl';
import { TextField } from '@mui/material';
import { FormLabel, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PhotoCamera } from '@mui/icons-material';
import Button from '@mui/material/Button';
import NavBar from '../NavBar/NavBar';

export default function FormProducts() {
	const navigate = useNavigate();

	const [createProducts] = usePostProductMutation();

	const [deleteProduct] = useDeleteProductMutation();

	const { data, isLoading } = useGetAllProductsQuery({
		data: {},
		page: 0,
		size: 5000,
	});

	const [input, setInput] = useState({
		title: '',
		unit_price: 0,
		stock: 0,
		category: '',
		description: '',
		imgUrl: '',
	});

	function handlerClickBack() {
		navigate(-1);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		await createProducts({
			title: input.title,
			unit_price: input.unit_price,
			stock: input.stock,
			category: input.category,
			description: input.description,
			imgUrl: input.imgUrl,
		}).unwrap();

		setInput({
			title: '',
			unit_price: 0,
			stock: 0,
			category: '',
			description: '',
			imgUrl: '',
		});

		alert('Producto Creado');

		navigate('/tienda');
	};

	const handleInputChange = function (e) {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const handlerImage = async (e) => {
		e.preventDefault();
		const url = await uploadImage(e.target.files);
		setInput({
			...input,
			imgUrl: url,
		});
	};

	if (isLoading) return <Loading />;

	return (
		<>
			<NavBar />
			<div className={style.mainContainer}>
				<div className={style.mainContainerForm}>
					<div className={style.goBack}>
						<IconButton
							onClick={handlerClickBack}
							sx={{
								color: 'var(--black-color)',
								'&:hover': {
									borderColor: 'var(--black-color)',
									backgroundColor: 'var(--hover-outlined-button)',
									transition: '0.4s ease-in-out',
								},
							}}
						>
							<ArrowBackIcon />
						</IconButton>
					</div>
					<form onSubmit={(e) => handleSubmit(e)}>
						<div>
							<FormControl>
								<div className={style.textField}>
									<TextField
										required
										sx={{ width: 300 }}
										key='standard-name'
										label='Ingrese el nombre del producto'
										name='title'
										value={input.title}
										onChange={handleInputChange}
									/>
								</div>

								<div className={style.textField}>
									<TextField
										required
										sx={{ width: 300 }}
										key='standard-name'
										label='Ingrese valor del producto'
										name='unit_price'
										value={input.unit_price}
										onChange={handleInputChange}
										type='number'
										InputProps={{
											inputProps: { min: 0 },
										}}
									/>
								</div>

								<div className={style.textField}>
									<TextField
										required
										sx={{ width: 300 }}
										key='standard-name'
										label='Stock disponible'
										name='stock'
										min='0'
										value={input.stock}
										onChange={handleInputChange}
										type='number'
										InputProps={{
											inputProps: { min: 0 },
										}}
									/>
								</div>

								<div className={style.textField}>
									<TextField
										sx={{ width: 300 }}
										key='standard-name'
										label='Ingrese categoria'
										name='category'
										value={input.category}
										onChange={handleInputChange}
									/>
								</div>

								<div className={style.textField}>
									<TextField
										sx={{ width: 300 }}
										key='standard-name'
										label='Descripcion del producto'
										name='description'
										value={input.description}
										onChange={handleInputChange}
									/>
								</div>

								<div className={style.textField}>
									<IconButton
										color='primary'
										aria-label='upload picture'
										component='label'
									>
										<FormLabel id='img-label'>Imagen</FormLabel>
										<input
											style={{ color: 'var(--secondary-color)' }}
											accept='image/*'
											type='file'
											name='imgUrl'
											onChange={handlerImage}
										/>
										<PhotoCamera sx={{ color: 'var(--primary-color)' }} />
									</IconButton>
								</div>

								<div className={style.textField}>
									<Button
										type='submit'
										sx={{
											display: 'flex',
											justifyContent: 'center',
											color: 'white',
											borderRadius: '6px',
											alignItems: 'center',

											width: 300,
											background: '#0d0d6b',
											'&:hover': {
												backgroundColor: '#62629f',
												transition: '0.4s',
											},
										}}
									>
										Crear producto
									</Button>
								</div>
							</FormControl>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
