import { ChangeEvent, VFC } from 'react'

type Props = {
  type: 'text' | 'textarea';
  label: string;
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const TextBoxItem: VFC<Props> = props => {
  return (
    <div className='flex flex-col'>
      <label
        htmlFor={props.id}
        className='text-lg font-bold mb-3'
      >{props.label}</label>
      {
        props.type === 'text'
          ? <input type="text" />
          : (
            <textarea
              name={props.id}
              id={props.id}
              onChange={props.onChange}
              cols={30}
              rows={10}
              className='border p-5'
            ></textarea>
          )
      }
    </div>
  )
}