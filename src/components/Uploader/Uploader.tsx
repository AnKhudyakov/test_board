import { ReactComponent as FileIcon } from '../../assets/icons/fileIcon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/deleteIcon.svg';
import { FileUploader } from 'react-drag-drop-files';
import { File, ToDoContextType } from '../../types';
import { Dispatch, useContext } from 'react';
import Button from '../Button/Button';
import styles from './Uploader.module.scss';
import { ToDoContext } from '../../context';

type UploaderProps = {
  files: File[];
  setFiles: Dispatch<React.SetStateAction<File[]>>;
};

function Uploader({ files, setFiles }: UploaderProps) {
  const { formik } = useContext(ToDoContext) as ToDoContextType;

  const hahdleFileChange = (newFile: any) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', () => {
      const file = {
        name: newFile.name,
        size: newFile.size,
        url: reader.result + '',
      };
      setFiles([...files, file]);
      formik.setFieldValue('files', [...formik.values.files, file]);
    });
    reader.readAsDataURL(newFile);
  };

  const handleDelete = (file: File) => {
    const updatedFiles = files.filter(
      (removedFile) => file.name !== removedFile.name
    );
    setFiles(updatedFiles);
    formik.setFieldValue('files', updatedFiles);
  };

  return (
    <div className={styles.container}>
      <FileUploader
        handleChange={hahdleFileChange}
        name="files"
        types={['TXT', 'RTF', 'PDF', 'DOC', 'JPG', 'JPEG', 'PNG', 'GIF']}
        hoverTitle="Drop here"
        fileOrFiles={files.length ? files : null}
        label="Upload or drop a file right here"
      />

      <ul>
        {files.map((file, index) => (
          <li className={styles.listItem} key={index}>
            <div className={styles.desc}>
              <FileIcon />
              File name: {file.name}, File size:{' '}
              {`${(file.size / 1024).toFixed(2)} Кб`}
            </div>
            <Button value="" type="button" onClick={() => handleDelete(file)}>
              <DeleteIcon />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Uploader;
