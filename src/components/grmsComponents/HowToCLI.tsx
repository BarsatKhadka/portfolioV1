import React from 'react'
import { CopyBlock, dracula } from 'react-code-blocks';
import { CgDarkMode } from 'react-icons/cg';

export const HowToCLI = () =>{
    return(
        <>
        <div className='text-white mt-16 lg:ml-48 ml-4 '>
        <p className='text-white'>Welcome to the EasyRepo CLI Guide</p> 
        <p className='text-sm text-red-500'>Currently, only a limited number of commands are available,<span className='text-green-500'> but more are on the way.</span></p>
        </div>
        <p className='lg:ml-48 ml-4 mt-8'>Repo Commands (Commands to perform repository actions) </p>
        <div className='max-w-2xl lg:ml-[175px] lg:p-4 p-2'>
           <CopyBlock
     text = {
        "repo tree <repoName>          | View the repository's tree structure" +
        "\nrepo calendar <repoName>  | View the repository's commit calendar" +
        "\nrepo loc <repoName>            | View the repository's lines of code" +
        "\nrepo readMe <repoName>    | Get the repository's README file" +
        "\nrepo ovs <repoName>           | Open the repository in VS Code" +
        "\nrepo delete <repoName>      | Delete the repository" +
        "\nrepo rename <repoName>    | Rename the repository"
    }
    
      language={"Java"}
      codeBlock
      theme={dracula}
    />
    </div>
    <p className='lg:ml-48 ml-4 mt-8'>Collections Commands (Commands to perform actions on collections) </p>
        <div className='max-w-3xl lg:ml-[175px] lg:p-4 p-2'>
           <CopyBlock
     text = {
        "collections create <collectionName> <<repoName1,repoName2>> (Put repoNames into a <>)" +
        "\ncollections rename <oldCollectionName> <newCollectionName> " +
        "\ncollections delete <collectionName>        "
    }
    
      language={"Java"}
      codeBlock
      theme={dracula}
    />
    </div>
   
        </>
    )
}