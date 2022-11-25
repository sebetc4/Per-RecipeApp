import {
    Box,
    TextField,
    Typography,
    Container,
    Button,
    Grid,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import React, { MouseEvent, useState } from 'react';
import { FieldError, useForm, UseFormRegisterReturn } from 'react-hook-form';
import { Logo } from '../../src/components';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../src/config/api.config';
import { ISignInParams } from '../../types/params.types';
import { signInSchemaValidation } from '../../utils/validationSchemas/signIn.schema';

export default function SignIn() {
    // Hooks
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError
    } = useForm<ISignInParams>({
        resolver: yupResolver(signInSchemaValidation),
        mode: 'onTouched',
    });

    const onSubmit = async (data: ISignInParams) => {
        try {
            const res = await api.post('/api/sign-in', data);
            console.log(res.data);
        } catch (err: any) {
            if (err.response.data.error === 'Email already exists' ) {
                setError('email', {type: 'custom', message: 'Ce mail existe déjà'})
            };
        }
    };

    return (
        <Container
            component='main'
            maxWidth='xs'
            sx={{
                paddingTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Logo
                size='60px'
                color='black'
            />
            <Typography
                component='h1'
                variant='h4'
                sx={{
                    margin: 1,
                }}
            >
                Connexion
            </Typography>
            <Typography
                component='h2'
                align='center'
                sx={{
                    marginBottom: 4,
                }}
            >
                Heureux de vous retouver! Connectez-vous pour accéder à votre compte.
            </Typography>
            <Box
                component='form'
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Grid
                    container
                    spacing={3}
                >
                    <CustomTextField
                        name='email'
                        label='Email'
                        type='email'
                        register={register('email')}
                        error={errors.email}
                    />
                    <CustomPasswordInput
                        register={register('password')}
                        error={errors.password}
                    />
                </Grid>
                <Button
                    disabled={isSubmitting}
                    type='submit'
                    variant='contained'
                    sx={{ marginTop: 4, marginBottom: 4 }}
                >
                    Se connecter
                </Button>
            </Box>
            <Typography>
                Vous n'avez pas de compte ? <Link href='/sign-up'>Inscrivez-vous</Link>
            </Typography>
        </Container>
    );
}

interface ICustomTextField {
    name: string;
    label: string;
    type: string;
    register: UseFormRegisterReturn;
    error: FieldError | undefined;
}

function CustomTextField({ name, label, type, register, error }: ICustomTextField) {
    return (
        <Grid
            item
            xs={12}
        >
            <TextField
                required
                id={`${name}-input`}
                label={label}
                variant='outlined'
                type={type}
                fullWidth
                {...register}
                error={!!error}
            />
            <Typography
                variant='inherit'
                color='error'
                mx={{
                    fontSize: '.8rem',
                    marginTop: 2,
                }}
            >
                {error?.message}
            </Typography>
        </Grid>
    );
}

interface ICustomPasswordInput {
    register: UseFormRegisterReturn;
    error: FieldError | undefined;
}

function CustomPasswordInput({ register, error }: ICustomPasswordInput) {
    const [showPassword, setShowPasswor] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPasswor((prev) => !prev);

    const handleMouseDownPassword = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    return (
        <Grid
            item
            xs={12}
        >
            <FormControl
                variant='outlined'
                error={!!error}
                sx={{
                    width: '100%',
                }}
            >
                <InputLabel
                    required
                    htmlFor='password-input'
                >
                    Mot de passe
                </InputLabel>
                <OutlinedInput
                    required
                    id='password-input'
                    type={showPassword ? 'text' : 'password'}
                    {...register}
                    fullWidth
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label='Modifier la visibilité du mot de passe'
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge='end'
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label='Mot de passe'
                />
            </FormControl>
            <Typography
                variant='inherit'
                color='error'
                mx={{
                    fontSize: '.8rem',
                    marginTop: 2,
                }}
            >
                {error?.message}
            </Typography>
        </Grid>
    );
}
