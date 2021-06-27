import os
#Each website you crawl is a separate project (folder)
def create_project_dir(directory):
    if not os.path.exists(directory):
        print('Creating Project '+directory)
        os.makedirs(directory)

#Create queue and crawled files (if not created)
def create_data_files(project_name):
    carwled = project_name + '/crawled_pages.txt'
    to_crawled = project_name + '/to_crawled_pages.txt'
    if not os.path.isfile(carwled):
        write_file(carwled,'')
    if not os.path.isfile(to_crawled):
        write_file(to_crawled,'')

#Create a new file
def write_file(path,data):
    f=open(path,'w')
    f.write(data)
    f.close
# Add data onto an existing file
def append_to_file(path,data):
    with open(path,'a') as file:
        file.write(data+'\n')


#Delete the contents of a file
def delete_file_contents(path):
    with open(path,'w'):
        pass

# Read a file and convert each line to set items
def file_to_set(file_name):
    results = set()
    with open(file_name,'rt') as f:
        for line in f:
            results.add(line.replace('\n',''))
    return results

# Iterate through a set, each items will be a new line in the file
def set_to_file(links,file):
    delete_file_contents(file)
    for link in sorted(links):
        append_to_file(file,link)
