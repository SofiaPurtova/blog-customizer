import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useEffect, useRef } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	setPageState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setPageState }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const sidebarRef = useRef<HTMLDivElement>(null); // Ref для сайдбара

	useEffect(() => {
		if (!isOpen) return; // Выходим, если сайдбар закрыт

		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false); // Закрываем сайдбар, если клик был за его пределами
			}
		};

		document.addEventListener('mousedown', handleClickOutside); // Добавляем обработчик при открытии

		return () => {
			document.removeEventListener('mousedown', handleClickOutside); // Удаляем обработчик при закрытии
		};
	}, [isOpen]);

	const handleToggle = () => {
		setIsOpen((prev) => !prev);
	};

	const handleReset = () => {
		setFormState(defaultArticleState); // Сбрасываем настройки
		setPageState(defaultArticleState);
		setIsOpen(false);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // Предотвращаем перезагрузку страницы
		setPageState(formState); // Передаём настройки в App
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							setFormState({ ...formState, fontFamilyOption: option })
						}
						title='Шрифт'
					/>
					<RadioGroup
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) =>
							setFormState({ ...formState, fontSizeOption: option })
						}
						name='font-size'
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={(option) =>
							setFormState({ ...formState, fontColor: option })
						}
						title='Цвет текста'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							setFormState({ ...formState, backgroundColor: option })
						}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							setFormState({ ...formState, contentWidth: option })
						}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
