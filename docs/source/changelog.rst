Changelog
=========

0.29.0
------

Contains breaking changes, the most significant of which are:

- Moves the runtime client build directory to a "user data" directory rather a directory
  where IDOM's code was installed. This has the advantage of not requiring write
  permissions to rebuild the client if IDOM was installed globally rather than in a
  virtual environment.
- The custom JS component interface has been reworked to expose an API similar to
  the ``createElement``, ``render``, ``unmountComponentAtNode`` functions from React.

**Issues Fixed:**

- :issue:`375`
- :issue:`394`
- :issue:`401`

**Highlighted Commits:**

- add try/except around event handling - :commit:`f2bf589`
- do not call find_builtin_server_type at import time - :commit:`e29745e`
- import default from react/reactDOM/fast-json-patch - :commit:`74c8a34`
- no named exports for react/reactDOM - :commit:`f13bf35`
- debug logs for runtime build dir create/update - :commit:`af94f4e`
- put runtime build in user data dir - :commit:`0af69d2`
- change shared to update_on_change - :commit:`6c09a86`
- rework js module interface + fix docs - :commit:`699cc66`
- correctly serialize File object - :commit:`a2398dc`


0.28.0
------

Includes a wide variety of improvements:

- support ``currentTime`` attr of audio/video elements
- support for the ``files`` attribute from the target of input elements
- model children are passed to the Javascript ``mount()`` function
- began to add tests to client-side javascript
- add a ``mountLayoutWithWebSocket`` function to ``idom-client-react``

and breaking changes, the most significant of which are:

- Refactor existing server implementations as functions adhering to a protocol. This
  greatly simplified much of the code responsible for setting up servers and avoids
  the use of inheritance.
- Switch to a monorepo-style structure for Javascript enabling a greater separation of
  concerns and common workspace scripts in ``package.json``.
- Use a ``loadImportSource()`` function instead of trying to infer the path to dynamic
  modules which was brittle and inflexible. Allowing the specific client implementation
  to discover where "import sources" are located means ``idom-client-react`` doesn't
  need to try and devise a solution that will work for all cases. The fallout from this
  change is the addition of `importSource.sourceType` which, for the moment can either
  be ``"NAME"`` or ``"URL"`` where the former indicates the client is expected to know
  where to find a module of that name, and the latter should (usually) be passed on to
  ``import()``


**Issues Fixed:**

- :issue:`324` (partially resolved)
- :issue:`375`

**Highlighted Commits:**

- xfail due to bug in Python - :commit:`fee49a7`
- add importSource sourceType field - :commit:`795bf94`
- refactor client to use loadImportSource param - :commit:`bb5e3f3`
- turn app into a package - :commit:`b282fc2`
- add debug logs - :commit:`4b4f9b7`
- add basic docs about JS test suite - :commit:`9ecfde5`
- only use nox for python tests - :commit:`5056b7b`
- test event serialization - :commit:`05fd86c`
- serialize files attribute of file input element - :commit:`f0d00b7`
- rename hasMount to exportsMount - :commit:`d55a28f`
- refactor flask - :commit:`94681b6`
- refactor tornado + misc fixes to sanic/fastapi - :commit:`16c9209`
- refactor fastapi using server protocol - :commit:`0cc03ba`
- recactor sanic server - :commit:`43d4b4f`
- use server protocol instead of inheritance - :commit:`abe0fde`
- support currentTime attr of audio/video elements - :commit:`975b54a`
- pass children as props to mount() - :commit:`9494bc0`


0.27.0
------

Introduces changes to the interface for custom Javascript components. This now allows
JS modules to export a ``mount(element, component, props)`` function which can be used
to bind new elements to the DOM instead of using the application's own React instance
and specifying React as a peer dependency. This avoids a wide variety of potential
issues with implementing custom components and opens up the possibility for a wider
variety of component implementations.

**Highlighted Commits:**

- modules with mount func should not have children - :commit:`94d006c`
- limit to flask<2.0 - :commit:`e7c11d0`
- federate modules with mount function - :commit:`bf63a62`


0.26.0
------

A collection of minor fixes and changes that, as a whole, add up to something requiring
a minor release. The most significant addition is a fix for situations where a
``Layout`` can raise an error when a component whose state has been delete is rendered.
This occurs when element has been unmounted, but a latent event tells the layout it
should be updated. For example, when a user clicks a button rapidly, and the resulting
update deletes the original button.

**Highlighted Commits:**

- only one attr dict in vdom constructor - :commit:`555086a`
- remove Option setter/getter with current property - :commit:`2627f79`
- add cli command to show options - :commit:`c9e6869`
- check component has model state before render - :commit:`6a50d56`
- rename daemon to run_in_thread + misc - :commit:`417b687`

0.25.0
------

Completely refactors :ref:`Layout Dispatchers <Layout Dispatcher>` by switching from a
class-based approach to one that leverages pure functions. While the logic itself isn't
any simpler, it was easier to implement, and now hopefully understand, correctly. This
conversion was motivated by several bugs that had cropped up related to improper usage
of ``anyio``.

**Issues Fixed:**

- :issue:`330`
- :issue:`298`

**Highlighted Commits:**

- improve docs + simplify multiview - :commit:`4129b60`
- require anyio>=3.0 - :commit:`24aed28`
- refactor dispatchers - :commit:`ce8e060`

0.24.0
------

This release contains an update that allows components and elements to have "identity".
That is, their state can be preserved across updates. Before this point, only the state
for the component at the root of an update was preserved. Now though, the state for any
component and element with a ``key`` that is unique amongst its siblings, will be
preserved so long as this is also true for parent elements/components within the scope
of the current update. Thus, only when the key of the element or component changes will
its state do the same.

In a future update, the default key for all elements and components will be its index
with respect to its siblings in the layout. The
:attr:`~idom.config.IDOM_FEATURE_INDEX_AS_DEFAULT_KEY` feature flag has been introduced
to allow users to enable this behavior early.

**Highlighted Commits:**

- add feature flag for default key behavior - :commit:`42ee01c`
- use unique object instead of index as default key - :commit:`5727ab4`
- make HookCatcher/StaticEventHandlers testing utils - :commit:`1abfd76`
- add element and component identity - :commit:`5548f02`
- minor doc updates - :commit:`e5511d9`
- add tests for callback identity preservation with keys - :commit:`72e03ec`
- add 'key' to VDOM spec - :commit:`c3236fe`
- Rename validate_serialized_vdom to validate_vdom - :commit:`d04faf9`
- EventHandler should not serialize itself - :commit:`f7a59f2`
- fix docs typos - :commit:`42b2e20`
- fixes: #331 - add roadmap to docs - :commit:`4226c12`

0.23.1
------

**Highlighted Commits:**

- fix non-deterministic return order in install() - :commit:`494d5c2`

0.23.0
------

**Highlighted Commits:**

- add changelog to docs - :commit:`9cbfe94`
- automatically reconnect to server - :commit:`3477e2b`
- allow no reconnect in client - :commit:`ef263c2`
- cleaner way to specify import sources - :commit:`ea19a07`
- add the idom-react-client back into the main repo - :commit:`5dcc3bb`
- implement fastapi render server - :commit:`94e0620`
- improve docstring for IDOM_CLIENT_BUILD_DIR - :commit:`962d885`
- cli improvements - :commit:`788fd86`
- rename SERIALIZED_VDOM_JSON_SCHEMA to VDOM_JSON_SCHEMA - :commit:`74ad578`
- better logging for modules - :commit:`39565b9`
- move client utils into private module - :commit:`f825e96`
- redirect BUILD_DIR imports to IDOM_CLIENT_BUILD_DIR option - :commit:`53fb23b`
- upgrade snowpack - :commit:`5697a2d`
- better logs for idom.run + flask server - :commit:`2b34e3d`
- move package to src dir - :commit:`066c9c5`
- idom restore uses backup - :commit:`773f78e`
