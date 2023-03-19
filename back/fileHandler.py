import os


def file_content (directory_path):
    file_content_list = []
    for filename in os.listdir(directory_path):
        file_path = os.path.join(directory_path, filename)
        if os.path.isfile(file_path):
            with open(file_path, 'r') as f:
                file_content_list.append({
                    'file_name': filename,
                    'content': f.read(),
                })
    

    return file_content_list
