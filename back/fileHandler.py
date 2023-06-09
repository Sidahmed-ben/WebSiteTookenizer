import os

# The function that reads files directory and returns 
# the content and the path of each file
def read_directory (directory_path):
    # Initialize file_content_list
    file_content_list = []
    for root, dirs, files in os.walk(directory_path):
        for file in files:
            # If the file is txt file
            if file.endswith(".txt"):
                file_path = os.path.join(root, file)
                # save the content and the path of each file
                with open(file_path, "r") as f:
                    file_content_list.append({
                        'file_path': file_path,
                        'content': f.read(),
                    })

    return file_content_list
