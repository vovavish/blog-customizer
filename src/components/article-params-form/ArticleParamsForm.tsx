import { useState } from 'react';

import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
	OptionType,
	ArticleStateKeysType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [articleStateBeforeSubmit, setArticleStateBeforeSubmit] =
		useState<ArticleStateType>(articleState);

	const onReset = () => {
		setArticleState(defaultArticleState);
		setArticleStateBeforeSubmit(defaultArticleState);
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleState(articleStateBeforeSubmit);
	};

	const updateArticleStateBeforeSubmit = (
		option: ArticleStateKeysType,
		value: OptionType
	) => {
		setArticleStateBeforeSubmit({
			...articleStateBeforeSubmit,
			[option]: value,
		});
	};

	const handleIsOpenSidebar = (isOpen: boolean) => {
		setIsOpen(isOpen);
	};

	return (
		<>
			{isOpen && (
				<div
					className={styles.backdrop}
					onClick={() => handleIsOpenSidebar(false)}
				/>
			)}
			<ArrowButton
				isOpen={isOpen}
				onClick={() => handleIsOpenSidebar(!isOpen)}
			/>
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
					<Text as='h3' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={articleStateBeforeSubmit.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) =>
							updateArticleStateBeforeSubmit('fontFamilyOption', value)
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='radio-font-size'
						selected={articleStateBeforeSubmit.fontSizeOption}
						options={fontSizeOptions}
						onChange={(value) =>
							updateArticleStateBeforeSubmit('fontSizeOption', value)
						}
					/>
					<Select
						title='цвет шрифта'
						selected={articleStateBeforeSubmit.fontColor}
						options={fontColors}
						onChange={(value) =>
							updateArticleStateBeforeSubmit('fontColor', value)
						}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={articleStateBeforeSubmit.backgroundColor}
						options={backgroundColors}
						onChange={(value) =>
							updateArticleStateBeforeSubmit('backgroundColor', value)
						}
					/>
					<Select
						title='ширина контента'
						selected={articleStateBeforeSubmit.contentWidth}
						options={contentWidthArr}
						onChange={(value) =>
							updateArticleStateBeforeSubmit('contentWidth', value)
						}
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
