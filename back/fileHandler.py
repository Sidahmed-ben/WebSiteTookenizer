import os


def read_directory (directory_path):
    file_content_list = []
    for root, dirs, files in os.walk(directory_path):
        for file in files:
            if file.endswith(".txt"):
                file_path = os.path.join(root, file)
                with open(file_path, "r") as f:
                    file_content_list.append({
                        'file_path': file_path,
                        'content': f.read(),
                    })

    return file_content_list
